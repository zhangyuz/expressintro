package com.zhangyuzheng.android.uploaddynamicfiles;

import java.util.ArrayList;
import java.util.List;

public class UploaderTest {

    @org.junit.Test
    public void upload() {
        Uploader uploader = new Uploader();
        UploadData data = new UploadData("system_app_anr", "this is test summary");
        List<String> attachemts = new ArrayList<>();
        attachemts.add("/home/zhangyuzheng/proj/CodeSamples/local.properties");
        attachemts.add("/home/zhangyuzheng/proj/CodeSamples/settings.gradle");
        List<String> logfiles = new ArrayList<>();
        logfiles.add("/home/zhangyuzheng/proj/CodeSamples/gradlew");
        logfiles.add("/home/zhangyuzheng/proj/CodeSamples/gradlew.bat");
        final boolean uploadDone;
        UploadListenerImpl listener = new UploadListenerImpl();
        uploader.upload(data, attachemts, logfiles, listener);
        while (!listener.done) {
            synchronized (listener) {
                try {
                    listener.wait(200l);
                } catch (Exception e) {
                    System.out.println("Upload done:" + e.getMessage());
                }
            }
        }
    }

    private class UploadListenerImpl implements Uploader.UploadListener {
        volatile boolean done = false;

        @Override
        public void onUploadFinished(UploadResult result) {
            done = true;
            System.out.println("Result:\n" + result);
        }
    }
}