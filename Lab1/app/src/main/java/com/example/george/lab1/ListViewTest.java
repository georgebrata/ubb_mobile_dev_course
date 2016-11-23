package com.example.george.lab1;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by George on 11/23/2016.
 */

public class ListViewTest extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.listview_layout);

        final EditText editText2 = (EditText) findViewById(R.id.editText);
        editText2.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                boolean handled = false;
                if (actionId == EditorInfo.IME_ACTION_SEND) {
                    handled = true;
                }
                return handled;
            }
        });

        String elem = getIntent().getStringExtra("curel");

        editText2.setText(elem);

        Button but2 = (Button) findViewById(R.id.button);
        but2.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.putExtra("RESULT_STRING", editText2.getText().toString());
                setResult(RESULT_OK, intent);
                finish();
            }
        });
    }

}