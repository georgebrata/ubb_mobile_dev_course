package com.example.nel3001.lab2mobile;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class BookActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book);

        Button btn = (Button) findViewById(R.id.button);
        final TextView isbn = (TextView) findViewById(R.id.isbn);
        final TextView name = (TextView) findViewById(R.id.name);
        final TextView author = (TextView) findViewById(R.id.author);
        isbn.clearComposingText();
        name.clearComposingText();
        author.clearComposingText();


        btn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                if (isbn.getText().toString() != "" && name.getText().toString() != "" && author.getText().toString() != "") {

                    Book b = new Book(isbn.getText().toString(),name.getText().toString(), author.getText().toString());
                    MainActivity.books.add(b);

                    Intent email = new Intent(Intent.ACTION_SEND);
                    email.putExtra(Intent.EXTRA_EMAIL, new String[]{"nel_3001@yahoo.com"});
                    email.putExtra(Intent.EXTRA_SUBJECT, "Book Added!");
                    email.putExtra(Intent.EXTRA_TEXT, "A new book with the following details has been added! \n" +
                            "ISBN: "+ isbn.getText().toString() + "\nNAME: " + name.getText().toString() + "\nAUTHOR: " + author.getText().toString());
                    email.setType("message/rfc822");
                    startActivity(Intent.createChooser(email, "Choose an Email client :"));



                    finish();
                } else {
                    Toast.makeText(getApplicationContext(),
                            "Fields can not be empty!", Toast.LENGTH_LONG).show();
                    finish();
                }
            }
        });
    }
}
