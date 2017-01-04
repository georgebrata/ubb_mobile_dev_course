package com.example.nel3001.lab2mobile;

import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.provider.MediaStore;
import android.provider.Settings;
import android.support.annotation.RequiresApi;
import android.support.design.widget.FloatingActionButton;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class MainActivity extends AppCompatActivity {

    static final int ADD_BOOK_REQUEST = 1;
    static final int EDIT_BOOK_REQUEST = 1;
    static final List<Book> books = new ArrayList<>();

    static final List<String> book_names = new ArrayList<>();

    static int arrayChanged = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        final ListView lv = (ListView) findViewById(R.id.listView);

        final ArrayAdapter<String> arrayAdapter = new ArrayAdapter<String>
                (this, android.R.layout.simple_selectable_list_item, book_names);

        // DataBind ListView with items from ArrayAdapter


        Context context = getApplicationContext();
        StringBuilder stringBuilder = new StringBuilder();
        String line;
        BufferedReader in = null;

        try {
            in = new BufferedReader(new FileReader(new File(context.getFilesDir(), "books1.txt")));
            System.out.println(context.getFilesDir());
            books.clear();
            while ((line = in.readLine()) != null) {
                //System.out.println(line);
                String[] fields = line.split("_");
                String isbn = "";
                String name = "";
                String auth = "";
                for (String s : fields ) {
                    String[] a = s.split(":");
                    if ( a[0].equals("ISBN") ) {
                        isbn = a[1];
                    }
                    if ( a[0].equals("Name")) {
                        name = a[1];
                    }
                    if (a[0].equals("Author")) {
                        auth = a[1];
                    }
                }
                Book b = new Book(isbn,name,auth);
                //books.add(b);
                System.out.println(books.contains(b));

                if ( !books.contains(b)) {
                    System.out.print("ADDED BOOK" + b.toString());
                    books.add(b);
                }
            }
            in.close();
        } catch (FileNotFoundException e) {
            //Logger.logError(TAG, e);
        } catch (IOException e) {
           // Logger.logError(TAG, e);
        }


        System.out.println("AAAAAAAAAAAAAAAAAAAA");
        for (Book b : books ) {
            System.out.print(b.toString());
        }


        for( int i = 0; i < books.size(); i++ ) {
            if ( !book_names.contains(books.get(i).getName())) {
                book_names.add(books.get(i).getName());
            }
        }

        lv.setAdapter(arrayAdapter);
        arrayAdapter.notifyDataSetChanged();

        lv.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {
            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
                final int pos = position;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        if (!isFinishing()){
                            new AlertDialog.Builder(MainActivity.this)
                                    .setTitle("Delete book?")
                                    .setMessage("Are you sure you want to delete this entry?")
                                    .setCancelable(true)
                                    .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {
                                            Toast.makeText(getApplicationContext(), "Deleted item with name: " + books.get(pos).getName(), Toast.LENGTH_LONG).show();

                                            books.remove(pos);
                                            book_names.remove(pos);
                                            arrayAdapter.notifyDataSetChanged();
                                        }
                                    })
                                    .setNegativeButton("No", new DialogInterface.OnClickListener() {
                                        @Override
                                        public void onClick(DialogInterface dialog, int which) {

                                        }
                                    }).show();
                        }
                    }
                });

                return true;
            }
        });

        lv.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {

                int itemPosition = position;

                //Listview clicked item value
                String isbn     = (String) books.get(position).getIsbn();
                String name     = (String) books.get(position).getName();
                String author   = (String) books.get(position).getAuthor();


                Intent i = new Intent(MainActivity.this, BookDetailsActivity.class);

                Bundle bundle = new Bundle();

                bundle.putString("isbn", isbn);
                bundle.putString("name", name);
                bundle.putString("author", author);

                i.putExtra("b",bundle);

                startActivityForResult(i,EDIT_BOOK_REQUEST);

            }
        });

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        FloatingActionButton fab2 = (FloatingActionButton) findViewById(R.id.fab2);

        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(MainActivity.this,BookActivity.class);
                startActivityForResult(intent, ADD_BOOK_REQUEST);

            }
        });

        fab2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                book_names.clear();
                for ( int i = 0; i < books.size(); i++ ) {
                    if ( !book_names.contains(books.get(i).getName())) {
                        book_names.add(books.get(i).getName());
                        arrayAdapter.notifyDataSetChanged();
                    }
                }
            }
        });
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
    @RequiresApi(api = Build.VERSION_CODES.ICE_CREAM_SANDWICH_MR1)
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        FloatingActionButton fab2 = (FloatingActionButton) findViewById(R.id.fab2);
        fab2.callOnClick();

    }
    @Override
    public void onPause() {
        super.onPause();

        Context context = getApplicationContext();

        try {
            FileOutputStream out = new FileOutputStream(new File(context.getFilesDir(), "books1.txt"));

            for ( Book b : books ) {
                out.write(b.toString().getBytes());
            }
            out.close();
        } catch (IOException e) {

        }
    }
}
