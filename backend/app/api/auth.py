from fastapi import APIRouter, HTTPException, Header, Depends
from typing import Optional
from app.schemas.dto import LoginRequestDTO, RegisterRequestDTO, AuthResponseDTO, UserDTO
from app.services.auth_service import AuthService

router = APIRouter(prefix="/api/auth", tags=["Authentication & User Management"])
auth_service = AuthService()

@router.post("/register", response_model=AuthResponseDTO)
async def register(payload: RegisterRequestDTO):
    try:
        return auth_service.register(payload.name, payload.email, payload.password)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=AuthResponseDTO)
async def login(payload: LoginRequestDTO):
    try:
        return auth_service.login(payload.email, payload.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))

@router.post("/demo", response_model=AuthResponseDTO)
async def login_demo():
    return auth_service.get_demo_user()

@router.get("/me", response_model=UserDTO)
async def get_current_user(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header.")
    
    token = authorization.replace("Bearer ", "").strip()
    user = auth_service.get_user_by_token(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid or expired session token.")
    return user
