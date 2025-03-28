import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Newscard.css";
const categories = [
  { key: "general", label: "General" },
  { key: "business", label: "Business" },
  { key: "entertainment", label: "Entertainment" },
  { key: "health", label: "Health" },
  { key: "science", label: "Science" },
  { key: "sports", label: "Sports" },
  { key: "technology", label: "Technology" }
];



const newsData = [
  { title: "Argentina", code: "ar", flag: "🇦🇷" },
  { title: "Australia", code: "au", flag: "🇦🇺" },
  { title: "Austria", code: "at", flag: "🇦🇹" },
  { title: "Belgium", code: "be", flag: "🇧🇪" },
  { title: "Brazil", code: "br", flag: "🇧🇷" },
  { title: "Bulgaria", code: "bg", flag: "🇧🇬" },
  { title: "Canada", code: "ca", flag: "🇨🇦" },
  { title: "China", code: "cn", flag: "🇨🇳" },
  { title: "Colombia", code: "co", flag: "🇨🇴" },
  { title: "Czech Republic", code: "cz", flag: "🇨🇿" },
  { title: "Egypt", code: "eg", flag: "🇪🇬" },
  { title: "France", code: "fr", flag: "🇫🇷" },
  { title: "Germany", code: "de", flag: "🇩🇪" },
  { title: "Greece", code: "gr", flag: "🇬🇷" },
  { title: "Hong Kong", code: "hk", flag: "🇭🇰" },
  { title: "Hungary", code: "hu", flag: "🇭🇺" },
  { title: "India", code: "in", flag: "🇮🇳" },
  { title: "Indonesia", code: "id", flag: "🇮🇩" },
  { title: "Ireland", code: "ie", flag: "🇮🇪" },
  { title: "Israel", code: "il", flag: "🇮🇱" },
  { title: "Italy", code: "it", flag: "🇮🇹" },
  { title: "Japan", code: "jp", flag: "🇯🇵" },
  { title: "Latvia", code: "lv", flag: "🇱🇻" },
  { title: "Lithuania", code: "lt", flag: "🇱🇹" },
  { title: "Malaysia", code: "my", flag: "🇲🇾" },
  { title: "Mexico", code: "mx", flag: "🇲🇽" },
  { title: "Morocco", code: "ma", flag: "🇲🇦" },
  { title: "Netherlands", code: "nl", flag: "🇳🇱" },
  { title: "New Zealand", code: "nz", flag: "🇳🇿" },
  { title: "Nigeria", code: "ng", flag: "🇳🇬" },
  { title: "Norway", code: "no", flag: "🇳🇴" },
  { title: "Philippines", code: "ph", flag: "🇵🇭" },
  { title: "Poland", code: "pl", flag: "🇵🇱" },
  { title: "Portugal", code: "pt", flag: "🇵🇹" },
  { title: "Romania", code: "ro", flag: "🇷🇴" },
  { title: "Saudi Arabia", code: "sa", flag: "🇸🇦" },
  { title: "Serbia", code: "rs", flag: "🇷🇸" },
  { title: "Singapore", code: "sg", flag: "🇸🇬" },
  { title: "United Kingdom", code: "gb", flag: "🇬🇧" },
  { title: "United States", code: "us", flag: "🇺🇸" }
];
export default function NewsCards() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showNotesPopup, setShowNotesPopup] = useState(false);
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);

  // Fetch Notes from Backend
  const fetchNotes = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/notes`);

      if (!response.ok) throw new Error("Failed to fetch notes");
      const data = await response.json();
      setAllNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch News from MediaStack API
  const fetchNews = async (countryCode, countryName) => {
    setLoading(true);
    setSelectedCountry(countryName);

    const apiKey = "8495b4fb2c704b51a6669a264550c2c1"; // Use the new API key
    const url = `https://newsapi.org/v2/top-headlines?category=business&country=${countryCode}&apiKey=${apiKey}`; // Adjusted URL
  

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setNewsArticles(data.articles || []);

    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Submit Note to Backend
  const submitNote = async () => {
    if (!note.trim()) return;
    try {
      const response = await fetch(`http://localhost:8080/api/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });
      if (!response.ok) throw new Error("Failed to submit note");
      setNote("");
      setShowNotesPopup(false);
      fetchNotes();
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  // Delete Note from Backend
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete note");
      setAllNotes((prevNotes) => prevNotes.filter((n) => n.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="news-container">
    <h1 className="news-header">News Mania: Read & Reflect</h1>
    <div className="categories">
        {categories.map((category) => (
          <div key={category.key} className="category">{category.label}</div>
        ))}
      </div>
      
      <div className="news-layout">
        <div className="news-cards-wrapper" style={{ display: "flex", gap: "15px", overflowX: "auto" }}>
          {newsData.map((news) => (
            <Card key={news.code} className="news-card" style={{ minWidth: "180px" }} onClick={() => fetchNews(news.code, news.title)}>
              <Card.Body>
                <Card.Title>{news.flag} {news.title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
        {/* {/* <div className="notes-section">
          <h2>Notes</h2>
          <p>Add your notes here...</p>
        </div> */}
      </div> 
      
      <div className="notes-display">
        <h2>Previous Notes</h2>
        {allNotes.length > 0 ? (
          <ul>
            {allNotes.slice(0, 10).map((n) => (
              <li key={n.id} className="note-item">
                {n.note}
                <button className="delete-btn" onClick={() => deleteNote(n.id)}>➖</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notes available.</p>
        )}
      </div>
{/* 
      <div className="news-cards-wrapper">
        {newsData.map((news) => (
          <Card key={news.id} className="news-card" onClick={() => fetchNews(news.code, news.title)}>
            <Card.Body>
              <h2 className="news-title">{news.title}</h2>
            </Card.Body>
          </Card>
        ))}
      </div> */}

{selectedCountry && (
  <div className="news-popup-overlay" onClick={() => setSelectedCountry(null)}>
    <div className="news-popup">
      <h2 className="popup-header">News from {selectedCountry}</h2>
      <div className="news-content" style={{ maxHeight: "400px", overflowY: "auto" }}>
        {loading ? (
          <p>Loading news...</p>
        ) : newsArticles.length > 0 ? (
          newsArticles.slice(0, 7).map((article, index) => (
            <div key={index} className="popup-article">
              <h3>{article.title}</h3>
              <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
            </div>
          ))
        ) : (
          <p>No news available.</p>
        )}
      </div>
      <Button onClick={() => setSelectedCountry(null)}>Close</Button>
    </div>
  </div>
)}


      <button className="add-notes-btn" onClick={() => setShowNotesPopup(true)}>📝 Add Notes</button>

      {showNotesPopup && (
        <div className="notes-popup-overlay">
          <div className="notes-popup">
            <h2>Add a Note</h2>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write your note here..."
            />
            <div className="notes-buttons">
              <Button onClick={() => setShowNotesPopup(false)}>Cancel</Button>
              <Button variant="primary" onClick={submitNote}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 