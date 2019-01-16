package com.example.aslandukovmatvej.myapplication

import android.app.Activity
import android.content.Context
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
import org.w3c.dom.Text

class UsersListActivity:Activity() {

    lateinit var vRecView: RecyclerView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.users_list_activity)

        val clientNameView = findViewById<TextView>(R.id.client_name)
        username = intent.getStringExtra("username")
        clientNameView.text = "Hello, $username!"

        vRecView = findViewById<RecyclerView>(R.id.recView)
        val client_id = intent.getStringExtra("client_id")
        val o = createRequest("$domain/api/clients/")
            .map { Gson().fromJson(it, UsersListApi::class.java) }
            .subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread())

        val request = o.subscribe({
            showRecView(it)
        }, {
            Log.e("tag", "", it)
        })
    }

    fun showRecView(usersList: UsersListApi) {
        var nUsersList = UsersListApi()
        val system_id = 16
        for (user in usersList) {
            if (user.id != system_id) {
                nUsersList.add(user)
            }
        }
        vRecView.adapter = RecAdapterU(nUsersList)
        vRecView.layoutManager = LinearLayoutManager(this)
    }
}

class RecAdapterU(val items: ArrayList<User>) : RecyclerView.Adapter<RecHolderU>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecHolderU {
        val inflater = LayoutInflater.from(parent!!.context)

        val view = inflater.inflate(R.layout.user_item, parent, false)

        return RecHolderU(view)
    }

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onBindViewHolder(holder: RecHolderU, position: Int) {
        val item = items[position]

        holder?.bind(item)
    }

    override fun getItemViewType(position: Int): Int {
        return super.getItemViewType(position)
    }

}

class RecHolderU(view: View):RecyclerView.ViewHolder(view) {
    fun bind(item: User) {
        val vName = itemView.findViewById<TextView>(R.id.username)
        vName.text = item.name
        val vAvatar = itemView.findViewById<ImageView>(R.id.user_avatar)
        Picasso.with(vAvatar.context).load("$domain${item.avatar}").into(vAvatar)
        vName.setOnClickListener {
            showUser(vName.context, item.id)
        }
        vAvatar.setOnClickListener {
            showUser(vName.context, item.id)
        }
    }

    fun showUser(context: Context, user_id: Int) {
        val i = Intent(itemView.context, UserDetailActivity::class.java)
        i.putExtra("user_id", user_id.toString())
        i.putExtra("username", username.toString())
        context.startActivity(i)
    }
}

class UsersListApi: ArrayList<User> ()

class User (
    val id: Int,
    val username: String,
    val name: String,
    val surname: String,
    val address: String,
    val avatar: String,
    val registered: String
)