package com.example.aslandukovmatvej.myapplication

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.TextView

class ProfileActivity: Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.profile_activity)

        val client_id = intent.getStringExtra("client_id")
        val username = intent.getStringExtra("username")

        findViewById<TextView>(R.id.client_name).text = "Hello, $username"
        val view_pets_button = findViewById<Button>(R.id.view_pets_button)
        val view_users_button = findViewById<Button>(R.id.view_users_button)

        view_pets_button.setOnClickListener {
            val i = Intent(this, PetsListActivity::class.java)
            i.putExtra("client_id", client_id)
            i.putExtra("username", username)
            startActivity(i)
        }

        view_users_button.setOnClickListener {
            val i = Intent(this, UsersListActivity::class.java)
            i.putExtra("client_id", client_id)
            i.putExtra("username", username)
            startActivity(i)
        }
    }
}