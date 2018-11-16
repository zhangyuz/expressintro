package com.zhangyuzheng.android.json;

import com.google.gson.Gson;

public class JsonIntro {
    static private final Gson gson = new Gson();

    public static String bean2Gson(JsonBean bean) {
        return gson.toJson(bean);
    }
}
