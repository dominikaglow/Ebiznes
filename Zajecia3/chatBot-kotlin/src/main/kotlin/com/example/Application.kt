package com.example

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.features.json.*
import io.ktor.client.features.json.serializer.*
import io.ktor.client.request.*
import io.ktor.http.*
import dev.kord.core.Kord
import dev.kord.core.on
import dev.kord.common.entity.Snowflake
import dev.kord.core.event.gateway.ReadyEvent
import dev.kord.core.event.message.MessageCreateEvent

suspend fun main() {
    val bot = Kord("")
    val channelId = Snowflake("1219973063718993934")

    bot.on<MessageCreateEvent> {
        if (message.author?.isBot == true) return@on
        if (message.channelId != channelId) return@on

        println("Received message: ${message.content}")
    }

    bot.login()
}
