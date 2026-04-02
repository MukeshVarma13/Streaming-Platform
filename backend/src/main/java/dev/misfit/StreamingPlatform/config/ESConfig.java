package dev.misfit.StreamingPlatform.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchConfiguration;

@Configuration
public class ESConfig extends ElasticsearchConfiguration {

    @Value("${elasticsearch.url}")
    private String HOSTANDPORT;

    @Override
    public ClientConfiguration clientConfiguration() {
        return ClientConfiguration.builder()
                .connectedTo(HOSTANDPORT)
//                .usingSsl()
//                .withBasicAuth("", "")
                .build();
    }
}
