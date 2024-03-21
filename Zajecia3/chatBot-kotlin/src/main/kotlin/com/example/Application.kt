package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*
import io.ktor.client.request.*
import io.ktor.http.*

suspend fun main() {
    val webhookUrl = "https://discord.com/api/webhooks/1219973162561966092/o5FjR-Z5kdRyYZuu54sSVI4yoS67_tzDqcnf_L_fZnjRH0uiu6y_7ut5OetVJ-w4GF7n"

    val client = HttpClient(CIO) {
        install(JsonFeature) {
            serializer = KotlinxSerializer(kotlinx.serialization.json.Json {
                ignoreUnknownKeys = true
            })
        }
    }

    while (true) {
        println("Enter your message (or 'exit' to quit):")
        val messageContent = readLine()
        if (messageContent == "exit" || messageContent.isNullOrBlank()) {
            break
        }

        val message = mapOf("content" to messageContent)

        client.post<Unit>(webhookUrl) {
            contentType(ContentType.Application.Json)
            body = message
        }
    }
}
