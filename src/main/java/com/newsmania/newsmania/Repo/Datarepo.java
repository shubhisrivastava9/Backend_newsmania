package com.newsmania.newsmania.Repo;

import com.newsmania.newsmania.Dao.Newsdatabase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Datarepo extends JpaRepository<Newsdatabase,Integer> {
}
