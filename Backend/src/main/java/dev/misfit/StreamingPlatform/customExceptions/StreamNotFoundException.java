package dev.misfit.StreamingPlatform.customExceptions;

public class StreamNotFoundException extends RuntimeException {
    public StreamNotFoundException(String message) {
        super(message);
    }
}
