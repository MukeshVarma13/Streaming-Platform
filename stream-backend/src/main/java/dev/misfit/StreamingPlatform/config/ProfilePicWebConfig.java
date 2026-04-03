package dev.misfit.StreamingPlatform.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ProfilePicWebConfig implements WebMvcConfigurer {

    @Value("${profile-picture.path}")
    private String profilePicPath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/profile-pic/**")
                .addResourceLocations("file:///" + profilePicPath + "/");
    }
}
