package com.example.aslandukovmatvej.myapplication

import android.app.Activity
import android.content.Intent
import android.os.Build.VERSION_CODES.P
import android.os.Bundle
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import com.google.gson.Gson
import com.squareup.picasso.Picasso
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers

class PetsListActivity:Activity() {

    lateinit var vRecView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.pets_list_activity)

        vRecView = findViewById<RecyclerView>(R.id.recView)
        val client_id = intent.getStringExtra("client_id")
        val o = createRequest("$domain/api/clients/$client_id/pets/")
                .map { Gson().fromJson(it, PetsListApi::class.java) }
                .subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

        val request = o.subscribe({
            showRecView(it)
        }, {
            Log.e("tag", "", it)
        })
    }

    fun showRecView(petsList: PetsListApi) {
        vRecView.adapter = RecAdapter(petsList)
        vRecView.layoutManager = LinearLayoutManager(this)
    }

    fun showLinearLayout(petsList: PetsListApi) {
        val inflater = layoutInflater
        for (pet in petsList) {
            //val list = findViewById<LinearLayout>(R.id.pets_list)
            //val view = inflater.inflate(R.layout.pet_item, list, false)
            //view.findViewById<TextView>(R.id.pet_name).text = "Name: " + pet.name
            //val vAvatar = itemView.findViewById<ImageView>(R.id.pet_avatar)
            /*view.setOnClickListener {
                Log.e("CLICK", recipe.id.toString())
                val i = Intent(this, RecipeDetailActivity::class.java)
                i.putExtra("recipe_id", recipe.id.toString())
                startActivity(i)
            }*/
            //list.addView(view)
        }
    }
}

class RecAdapter(val items: ArrayList<Pet>) : RecyclerView.Adapter<RecHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecHolder {
        val inflater = LayoutInflater.from(parent!!.context)

        val view = inflater.inflate(R.layout.pet_item, parent, false)

        return RecHolder(view)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: RecHolder, position: Int) {
        val item = items[position]

        holder?.bind(item)
    }

    override fun getItemViewType(position: Int): Int {
        return super.getItemViewType(position)
    }

}

class RecHolder(view: View):RecyclerView.ViewHolder(view) {
    fun bind(item: Pet) {
        val vName = itemView.findViewById<TextView>(R.id.pet_name)
        vName.text = item.name
        val vAvatar = itemView.findViewById<ImageView>(R.id.pet_avatar)
        Picasso.with(vAvatar.context).load("$domain${item.avatar}").into(vAvatar)
    }
}

class PetsListApi: ArrayList<Pet> ()

class Pet (
    val name: String,
    val avatar: String
)