package dev.misfit.StreamingPlatform.customExceptions;

public class StreamProcessingException extends RuntimeException {
    public StreamProcessingException(String message) {
        super(message);
    }

    public StreamProcessingException(String message, Throwable cause) {
        super(message, cause);
    }
}
