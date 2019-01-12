package com.example.aslandukovmatvej.myapplication

import android.content.Context.INPUT_METHOD_SERVICE
import android.support.v4.content.ContextCompat.getSystemService
import android.view.KeyEvent
import android.view.inputmethod.EditorInfo
import android.widget.TextView
import android.widget.TextView.OnEditorActionListener


internal class DoneOnEditorActionListener : OnEditorActionListener {
    override  fun onEditorAction(v: TextView, actionId: Int, event: android.view.KeyEvent): Boolean {
        if (actionId == EditorInfo.IME_ACTION_DONE) {
            val imm = v.context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE) as android.view.inputmethod.InputMethodManager
            imm.hideSoftInputFromWindow(v.windowToken, 0)
            return true
        }
        return false
    }
}