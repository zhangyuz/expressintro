package com.zhangyuzheng.android.uploaddynamicfiles;

public class UploadData {
    private String tag;
    private String summary;

    public UploadData(String tag, String summary) {
        this.tag = tag;
        this.summary = summary;
    }

    public UploadData() {
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    @Override
    public String toString() {
        return "UploadData{" +
                "tag='" + tag + '\'' +
                ", summary='" + summary + '\'' +
                '}';
    }

    @Override
    public int hashCode() {
        return ("" + tag + summary).hashCode();
    }
}
