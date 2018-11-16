package com.zhangyuzheng.android.json;

import java.util.Objects;

public class JsonBean {
    public JsonBean() {
    }

    public JsonBean(String tag) {
        this.tag = tag;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        JsonBean jsonBean = (JsonBean) o;
        return Objects.equals(tag, jsonBean.tag);
    }

    @Override
    public int hashCode() {

        return Objects.hash(tag);
    }

    private String tag;
}
