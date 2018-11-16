package com.zhangyuzheng.android.uploaddynamicfiles;

import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.adapter.rxjava.RxJavaCallAdapterFactory;
import retrofit2.converter.gson.GsonConverterFactory;

public class UploadServiceGenerator {
    private static final String API_BASE_URL = "http://192.168.70.198:3000/";
    private OkHttpClient.Builder httpClient = new OkHttpClient.Builder();

    private Retrofit.Builder builder = new Retrofit.Builder()
            .baseUrl(API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJavaCallAdapterFactory.create());

    private Retrofit retrofit = builder.client(httpClient.build()).build();

    private UploadServiceGenerator() {
    }

    private static volatile UploadServiceGenerator sGenerator;

    public static UploadServiceGenerator getGenerator() {
        if (sGenerator == null) {
            synchronized (UploadServiceGenerator.class) {
                if (sGenerator == null) {
                    sGenerator = new UploadServiceGenerator();
                }
            }
        }
        return sGenerator;
    }

    public <S> S createService(Class<S> serviceClass) {
        return retrofit.create(serviceClass);
    }
}
