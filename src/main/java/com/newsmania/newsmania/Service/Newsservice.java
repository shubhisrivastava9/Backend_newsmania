package com.newsmania.newsmania.Service;

import com.newsmania.newsmania.Dao.Newsdatabase;
import com.newsmania.newsmania.Repo.Datarepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Newsservice {

        @Autowired
        Datarepo reposit;

        public ResponseEntity<String> addall(Newsdatabase nw) {
            reposit.save(nw);
            return new ResponseEntity<>("success", HttpStatus.CREATED);
        }

        public List<Newsdatabase> getAllNotes() {
            return reposit.findAll();
        }

    public ResponseEntity<String> deleteel(Integer id) {
            List<Newsdatabase>sk=reposit.findAll();
            for(Newsdatabase s: sk)
            {
                if(s.getId().equals(id))
                {
                    reposit.deleteById(id);
                }

                return ResponseEntity.ok("Entity with ID " + id + " deleted.");

            }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Entity with ID " + id + " not found.");

    }
}

