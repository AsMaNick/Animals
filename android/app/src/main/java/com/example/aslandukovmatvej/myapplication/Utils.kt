package com.example.aslandukovmatvej.myapplication

import java.net.HttpURLConnection
import java.net.URL
import io.reactivex.Observable
import java.lang.RuntimeException

const val domain = "https://BigBag.pythonanywhere.com"

fun createRequest(url: String) = Observable.create<String> {
    var urlConnection = URL(url).openConnection() as HttpURLConnection
    try {
        urlConnection.connect()
        if (urlConnection.responseCode != HttpURLConnection.HTTP_OK) {
            it.onError(RuntimeException(urlConnection.responseMessage))
        } else {
            val str = urlConnection.inputStream.bufferedReader().readText()
            it.onNext(str)
        }
    } finally {
        urlConnection.disconnect()
    }
}

/*fun sendPostRequest(url: String, username:String, password:String) = Observable.create<String> {
    Log.e("url", url)
    var reqParam = URLEncoder.encode("username", "UTF-8") + "=" + URLEncoder.encode(username, "UTF-8")
    reqParam += "&" + URLEncoder.encode("password", "UTF-8") + "=" + URLEncoder.encode(password, "UTF-8")
    val mURL = URL(url)

    with(mURL.openConnection() as HttpURLConnection) {
        // optional default is GET
        requestMethod = "POST"

        val wr = OutputStreamWriter(getOutputStream());
        wr.write(reqParam);
        wr.flush();

        Log.e("url", url)
        Log.e("responseCode", responseCode.toString())
        BufferedReader(InputStreamReader(inputStream)).use {
            val response = StringBuffer()

            var inputLine = it.readLine()
            while (inputLine != null) {
                response.append(inputLine)
                inputLine = it.readLine()
            }
            it.close()
            //Log.e("response", response.toString())
            it.onNext(response)
        }
    }
}*/