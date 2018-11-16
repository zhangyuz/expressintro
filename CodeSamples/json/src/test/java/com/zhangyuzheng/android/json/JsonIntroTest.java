package com.zhangyuzheng.android.json;

import static org.junit.Assert.*;

public class JsonIntroTest {

    @org.junit.Test
    public void bean2Gson() {
        JsonBean bean = new JsonBean("system_app_anr");
        System.out.print(JsonIntro.bean2Gson(bean));
    }
}