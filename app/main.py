from fastapi import FastAPI

app = FastAPI(title="Traffic SMS Notifier")


@app.get("/")
async def root():
    return {"message": "hello world"}


@app.get("/health")
def health():
    return {"status": "okay"}
