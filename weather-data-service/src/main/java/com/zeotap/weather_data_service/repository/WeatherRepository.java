package com.zeotap.weather_data_service.repository;

import com.zeotap.weather_data_service.model.GetWeatherRequest;
import com.zeotap.weather_data_service.model.Weather;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WeatherRepository extends MongoRepository<Weather, String> {
    List<Weather> findByName(String name);
}
