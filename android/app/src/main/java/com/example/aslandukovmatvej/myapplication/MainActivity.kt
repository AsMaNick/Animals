package com.example.aslandukovmatvej.myapplication

import android.content.Intent
import android.support.v7.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.TextView
import android.widget.Button
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.Disposable
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.profile_activity.*

class MainActivity : AppCompatActivity() {

    var request:Disposable?=null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //val v = findViewById<EditText>(R.id.username)
        //v.setOnEditorActionListener(DoneOnEditorActionListener())
        val login_button = findViewById<Button>(R.id.login_button)
        val username = findViewById<EditText>(R.id.username)
        val password = findViewById<EditText>(R.id.password)
        val invalid_data_label = findViewById<TextView>(R.id.invalid_data_label)

        login_button.setOnClickListener {
            Log.e("username", username.text.toString())
            Log.e("password", password.text.toString())

            var client_id = ""

            if (username.text.toString() == "" && password.text.toString() == "") {
                client_id = "9"
            } else if (username.text.toString() == "matvej" && password.text.toString() == "1234") {
                client_id = "9"
            } else if (username.text.toString() == "XuMuK" && password.text.toString() == "qwerty") {
                client_id = "15"
            }
            if (client_id == "") {
                invalid_data_label.text = "Invalid login or password";
            } else {
                val i = Intent(this, PetsListActivity::class.java)
                i.putExtra("client_id", client_id)
                invalid_data_label.text = "";
                startActivity(i)
            }
        }

    }

    override fun onStart() {
        super.onStart()
    }

    override fun onResume() {
        super.onResume()
    }

    override fun onPause() {
        super.onPause()
    }

    override fun onStop() {
        super.onStop()
    }

    override fun onDestroy() {
        super.onDestroy()
    }
}