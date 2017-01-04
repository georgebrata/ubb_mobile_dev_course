package com.example.nel3001.lab2mobile;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class BookDetailsActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_details);

        Bundle b = getIntent().getBundleExtra("b");
        final String isbn = b.getString("isbn");
        final String name = b.getString("name");
        final String author = b.getString("author");
        //Book book = new Book();
        int found = -1;

        for ( int i = 0; i < MainActivity.books.size(); i++ ) {
            if ( MainActivity.books.get(i).getIsbn().equals(isbn)
                    && MainActivity.books.get(i).getName().equals(name)
                    && MainActivity.books.get(i).getAuthor().equals(author)) {
                        found = i;
            }
        }


        final int index = found;


        final EditText isbn_et = (EditText) findViewById(R.id.isbnET);
        final EditText name_et = (EditText) findViewById(R.id.nameET);
        final EditText author_et = (EditText) findViewById(R.id.authorET);

        Button saveBtn = (Button) findViewById(R.id.button2);

        isbn_et.setText((CharSequence) isbn);
        name_et.setText((CharSequence) name);
        author_et.setText((CharSequence) author);

        saveBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                if ( !isbn.equals(isbn_et.getText().toString())
                        || !name.equals(name_et.getText().toString())
                        || !author.equals(author_et.getText().toString())) {

                    MainActivity.books.get(index).setIsbn(isbn_et.getText().toString());
                    MainActivity.books.get(index).setName(name_et.getText().toString());
                    MainActivity.books.get(index).setAuthor(author_et.getText().toString());
                    Toast.makeText(getApplicationContext(),MainActivity.books.get(index).toString()
                            , Toast.LENGTH_LONG).show();
                    finish();
                } else {
                    Toast.makeText(getApplicationContext(),
                            "Nothing changed!", Toast.LENGTH_LONG).show();
                    finish();
                }
            }
        });
    }
}
