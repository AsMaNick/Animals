package com.example.aslandukovmatvej.myapplication

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import com.google.gson.Gson
import com.squareup.picasso.Picasso
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class UserDetailActivity:Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.user_detail_activity)

        val user_id = intent.getStringExtra("user_id")
        val clientNameView = findViewById<TextView>(R.id.client_name)
        val username = intent.getStringExtra("username")
        clientNameView.text = "Hello, $username!"

        val o =
            createRequest("$domain/api/clients/$user_id/")
                .map { Gson().fromJson(it, User::class.java) }
                .subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

        val request = o.subscribe({
            showUserDetail(it)
        }, {
            Log.e("tag", "", it)
        })
    }

    fun showUserDetail(user: User) {
        findViewById<TextView>(R.id.username).text = "Userame: " + user.username
        findViewById<TextView>(R.id.fullname).text = "Full name: " + user.name + " " + user.surname
        findViewById<TextView>(R.id.address).text = "Address: " + user.address
        findViewById<TextView>(R.id.registered).text = "Registration date: " + user.registered.substring(0, 10)
        val vAvatar = findViewById<ImageView>(R.id.user_avatar)
        Picasso.with(vAvatar.context).load("$domain${user.avatar}").into(vAvatar)
    }
}