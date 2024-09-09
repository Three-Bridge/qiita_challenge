package com.example.backend

import org.springframework.stereotype.Service

interface ThreeBridgeService {
    fun getThreeBridge(): List<String>
}

@Service
class DefaultThreeBridgeService(private val threeBridgeRepository: ThreeBridgeRepository): ThreeBridgeService {
    override fun getThreeBridge(): List<String> {
        return threeBridgeRepository.findAll().map { it.text }
    }
}