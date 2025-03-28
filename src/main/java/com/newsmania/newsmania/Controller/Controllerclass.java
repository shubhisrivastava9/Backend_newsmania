package com.newsmania.newsmania.Controller;

import com.newsmania.newsmania.Dao.Newsdatabase;
import com.newsmania.newsmania.Service.Newsservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*") // Allow frontend access
public class Controllerclass {

    @Autowired
    Newsservice serv;
    @PostMapping("submit")
    public ResponseEntity<String> Onsubmit(@RequestBody Newsdatabase nw) {
        System.out.println("Received Note: " + nw.getNote()); // Debugging log
        return serv.addall(nw);
    }
    @GetMapping("notes") // New API to fetch all notes
    public List<Newsdatabase> getAllNotes() {
        return serv.getAllNotes();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String>Ondelete(@PathVariable Integer id)
    {
        return serv.deleteel(id);
    }



}
