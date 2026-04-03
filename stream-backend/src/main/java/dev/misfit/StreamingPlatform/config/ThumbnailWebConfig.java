package dev.misfit.StreamingPlatform.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ThumbnailWebConfig implements WebMvcConfigurer {

    @Value("${videos.path}")
    private String thumbnailPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/thumbnail/**")
                .addResourceLocations("file:///" + thumbnailPath + "/");
    }
}
