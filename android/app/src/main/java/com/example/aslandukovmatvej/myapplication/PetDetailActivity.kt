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

class PetDetailActivity:Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.pet_detail_activity)

        val pet_id = intent.getStringExtra("pet_id")
        val clientNameView = findViewById<TextView>(R.id.client_name)
        val username = intent.getStringExtra("username")
        clientNameView.text = "Hello, $username!"

        val o =
            createRequest("$domain/api/pets/$pet_id/")
                .map { Gson().fromJson(it, Pet::class.java) }
                .subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

        val request = o.subscribe({
            showPetDetail(it)
        }, {
            Log.e("tag", "", it)
        })
    }

    fun showPetDetail(pet: Pet) {
        findViewById<TextView>(R.id.pet_name).text = "Name: " + pet.name
        findViewById<TextView>(R.id.pet_kind).text = "Kind: " + pet.kind
        findViewById<TextView>(R.id.pet_gender).text = "Gender: " + pet.gender
        findViewById<TextView>(R.id.pet_breed).text = "Breed: " + pet.breed
        findViewById<TextView>(R.id.pet_birthday).text = "Birthday: " + pet.birthday
        findViewById<TextView>(R.id.pet_description).text = "Description: " + pet.description
        val vAvatar = findViewById<ImageView>(R.id.pet_avatar)
        Picasso.with(vAvatar.context).load("$domain${pet.avatar}").into(vAvatar)
    }
}