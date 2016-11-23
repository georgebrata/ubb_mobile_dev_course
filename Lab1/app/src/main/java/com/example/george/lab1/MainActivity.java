package com.example.george.lab1;

import android.content.Intent;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    public static final String TEST = "test";
    ListView listView ;
    int position;
    String[] values;
    ArrayAdapter<String> adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final EditText editText = (EditText) findViewById(R.id.message_input);
        Button but = (Button) findViewById(R.id.button);
        but.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_SEND);
                intent.setType("text/plain");
                intent.putExtra(Intent.EXTRA_EMAIL, "test@example.com");
                intent.putExtra(Intent.EXTRA_SUBJECT, "Test");
                intent.putExtra(Intent.EXTRA_TEXT, editText.getText().toString());
                startActivity(Intent.createChooser(intent, "Send"));
            }
        });

        //list functionalities
        listView = (ListView) findViewById(R.id.item_list);

        // Defined Array values to show in ListViewTest
        values = new String[] {"Hello World", "Hei World", "Hello", "Hey", "Hei"};

        adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_list_item_1, android.R.id.text1, values);

        // Assign adapter to ListViewTest
        listView.setAdapter(adapter);

        // ListViewTest Item Click Listener
        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                // When clicked, change the editText to selected value
                editText.setText(((TextView) view).getText().toString());
            }
        });

        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> arg0, View view, int pos, long id) {
                position = pos;
                Intent intent = new Intent(MainActivity.this, ListViewTest.class);
                intent.putExtra("curel",((TextView) view).getText().toString());
                startActivityForResult(intent,1);

                return true;
            }
        });



    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == 1) {
            if (resultCode == RESULT_OK) {
                String new_data = data.getStringExtra("RESULT_STRING");
                values[position] = new_data;
                adapter.notifyDataSetChanged();
            }
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }




}
