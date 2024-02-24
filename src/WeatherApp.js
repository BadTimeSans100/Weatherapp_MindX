import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?q=$%7BinputRef.current.value%7D&units=metric&appid=53d2b9e5ffc4c41135c1487777c28306';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const getWeatherData = async () => {
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            setWeather(response.data);
            setError(null);
        } catch (error) {
            setError('Không thể tìm thấy thông tin cho thành phố này.');
            setWeather(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeatherData();
    };

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCity">
                            <Form.Label>Nhập tên thành phố:</Form.Label>
                            <Form.Control type="text" placeholder="Nhập tên thành phố" value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Tìm kiếm
                        </Button>
                    </Form>
                    {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                    {weather && (
                        <div className="mt-3">
                            <h3>Thông tin thời tiết cho {weather.name}</h3>
                            <p>Nhiệt độ: {weather.main.temp} °C</p>
                            <p>Độ ẩm: {weather.main.humidity}%</p>
                            <p>Mô tả: {weather.weather[0].description}</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default WeatherApp;
