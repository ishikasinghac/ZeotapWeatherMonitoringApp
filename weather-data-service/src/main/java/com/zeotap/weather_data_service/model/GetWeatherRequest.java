package com.zeotap.weather_data_service.model;

public class GetWeatherRequest {
    private String city;

    public GetWeatherRequest(String city) {
        this.city = city;
    }

    public GetWeatherRequest() {
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
