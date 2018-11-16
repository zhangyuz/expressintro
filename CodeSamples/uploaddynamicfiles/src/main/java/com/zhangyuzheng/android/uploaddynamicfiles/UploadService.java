package com.zhangyuzheng.android.uploaddynamicfiles;

import java.util.List;

import okhttp3.MultipartBody;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import rx.Observable;

public interface UploadService {
    @Multipart
    @POST("crashreport")
    Observable<UploadResult> uploadCrashReport(
            @Part MultipartBody.Part data,
            @Part List<MultipartBody.Part> attachments,
            @Part List<MultipartBody.Part> logFiles);
}
