package com.example.nel3001.lab2mobile;

/**
 * Created by nel3001 on 03.12.2016.
 */

public class Book {
    private String isbn;
    private String name;
    private String author;

    public Book() {
        this.isbn   = "123456789";
        this.name   = "Sample Name";
        this.author = "Sample Author";
    }
    public Book(String isbn, String name, String author) {
        this.isbn   = isbn;
        this.name   = name;
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }
    public String getName() {
        return name;
    }
    public String getAuthor() {
        return author;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof Book))
            return false;
        if (obj == this)
            return true;

        Book o = (Book) obj;
        if ( this.getIsbn().equals(o.getIsbn())) {
            return true;
        }
        return false;
    }


    @Override
    public String toString() {
        return "ISBN:" + this.isbn + "_Name:" + this.name + "_Author:" + this.author + "\n";
    }
}
