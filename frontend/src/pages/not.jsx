function NotPage() {
    return (
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
        <iframe 
          src="/html/back.html"
          width="100%" 
          height="100%"
          style={{ border: "none" }}
          title="Embedded Page"
        />
      </div>
    );
  }
  
  export default NotPage;
  