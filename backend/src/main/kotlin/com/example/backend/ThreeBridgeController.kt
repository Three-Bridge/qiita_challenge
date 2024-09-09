package com.example.backend

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api")
class ThreeBridgeController(private val threeBridgeService: ThreeBridgeService) {
    @GetMapping("/threebridge")
    fun getThreeBridge(): List<String> {
        return threeBridgeService.getThreeBridge()
    }
}