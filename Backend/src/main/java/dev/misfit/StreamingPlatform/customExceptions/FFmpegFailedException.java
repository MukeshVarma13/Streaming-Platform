package dev.misfit.StreamingPlatform.customExceptions;

public class FFmpegFailedException extends RuntimeException {
    public FFmpegFailedException(String message) {
        super(message);
    }
    public FFmpegFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}
