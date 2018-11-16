package com.zhangyuzheng.android.uploaddynamicfiles;

import com.google.gson.Gson;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.RequestBody;
import rx.Observable;
import rx.Subscriber;
import rx.schedulers.Schedulers;

public class Uploader {

    private static final MediaType DEFAULT_MEDIA_TYPE = MediaType.parse("application/octet-stream");

    private Gson gson = new Gson();

    public void upload(UploadData data, List<String> attachments, List<String> logfiles, UploadListener listener) {

        UploadService uploadService = UploadServiceGenerator.getGenerator().createService(UploadService.class);

        Observable<UploadResult> result = uploadService.uploadCrashReport(prepareDataPart(data),
                prepareBinaryParts("attachments", attachments),
                prepareBinaryParts("logfiles", logfiles));
        result.subscribeOn(Schedulers.io()).subscribe(new Subscriber<UploadResult>() {
            @Override
            public void onCompleted() {
                System.out.println("Upload completed.");
            }

            @Override
            public void onError(Throwable e) {
                e.printStackTrace();
                listener.onUploadFinished(new UploadResult(false, e.getMessage()));
            }

            @Override
            public void onNext(UploadResult result) {
                if (listener != null) {
                    listener.onUploadFinished(result);
                } else {
                    System.out.println("Upload done:" + result);
                }
            }
        });
    }

    private MultipartBody.Part prepareDataPart(UploadData data) {
        return MultipartBody.Part.createFormData("metadata", gson.toJson(data));
    }

    private List<MultipartBody.Part> prepareBinaryParts(String fieldName, List<String> fileNameList) {
        if (fileNameList == null || fileNameList.size() == 0) {
            throw new RuntimeException("Invalid data:" + fileNameList);
        }
        List<MultipartBody.Part> parts = new ArrayList<>();
        for (String fileName :
                fileNameList) {
            File file = new File(fileName);
            RequestBody requestFile = RequestBody.create(probeFileType(file), file);
            MultipartBody.Part part = MultipartBody.Part.createFormData(fieldName, fileName, requestFile);
            parts.add(part);
        }
        return parts;
    }

    private MediaType probeFileType(File file) {
        try {
            return MediaType.parse(Files.probeContentType(file.toPath()));
        } catch (IOException e) {
            return DEFAULT_MEDIA_TYPE;
        }
    }

    public interface UploadListener {
        public void onUploadFinished(UploadResult result);
    }
}
