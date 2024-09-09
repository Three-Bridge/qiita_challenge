package com.example.backend

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.util.*

@Entity
@Table(name = "three_bridge")
data class ThreeBridgeRecord(
    @Id
    val id: UUID = UUID.randomUUID(),
    val text: String,
)