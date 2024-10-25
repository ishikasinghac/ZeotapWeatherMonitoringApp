package com.zeotap.weather_data_service.controller;

import com.zeotap.weather_data_service.model.GetWeatherRequest;
import com.zeotap.weather_data_service.model.Weather;
import com.zeotap.weather_data_service.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/weather/data")
public class WeatherDataController {

    @Autowired
    private WeatherRepository weatherRepository;
    @PostMapping("/save")
    public ResponseEntity<Weather> saveWeatherData(@RequestBody Weather weather) {

        Weather save = weatherRepository.save(weather);

        return ResponseEntity.ok(save);
    }

    @PostMapping("/get")
    public ResponseEntity<List<Weather>> getAllWeatherData(@RequestBody GetWeatherRequest getWeatherRequest) {
        List<Weather> weatherList = weatherRepository.findByName(getWeatherRequest.getCity());

        List<Weather> uniqueWeatherList = weatherList.stream()
                .collect(Collectors.toMap(
                        Weather::getDateTime, // Use dateTime as the key
                        weather -> weather,   // Map the Weather object as the value
                        (existing, replacement) -> existing)) // Keep the first occurrence
                .values()
                .stream()
                .collect(Collectors.toList());


        return ResponseEntity.ok(uniqueWeatherList);
    }
}
