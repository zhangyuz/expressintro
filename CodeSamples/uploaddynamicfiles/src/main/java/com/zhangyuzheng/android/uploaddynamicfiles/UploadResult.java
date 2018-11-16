package com.zhangyuzheng.android.uploaddynamicfiles;

public class UploadResult {
    public boolean successful;
    public String msg;

    public UploadResult(boolean successful, String msg) {
        this.successful = successful;
        this.msg = msg;
    }

    public UploadResult() {
    }

    public boolean isSuccessful() {
        return successful;
    }

    public void setSuccessful(boolean successful) {
        this.successful = successful;
    }

    public String getMsg() {
        return msg;
    }

    @Override
    public String toString() {
        return "UploadResult{" +
                "successful=" + successful +
                ", msg='" + msg + '\'' +
                '}';
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public void from(UploadResult result) {
        this.successful = result.successful;
        this.msg = result.msg;
    }
}
