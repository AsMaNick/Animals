package com.example.aslandukovmatvej.myapplication

import android.app.Activity
import android.os.Bundle
import android.util.Log
import android.widget.TextView

class ProfileActivity: Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.profile_activity)

        val client_id = intent.getStringExtra("client_id")

        findViewById<TextView>(R.id.test).text = client_id
    }
}