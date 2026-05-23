from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import Optional

router = APIRouter()


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "student"  # student, teacher, admin


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """
    Register a new user
    """
    # TODO: Implement Supabase auth registration
    return {
        "access_token": "mock_token",
        "token_type": "bearer",
        "user": {
            "id": "1",
            "email": request.email,
            "full_name": request.full_name,
            "role": request.role,
        }
    }


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """
    Login user
    """
    # TODO: Implement Supabase auth login
    return {
        "access_token": "mock_token",
        "token_type": "bearer",
        "user": {
            "id": "1",
            "email": request.email,
            "full_name": "John Doe",
            "role": "student",
        }
    }


@router.get("/me")
async def get_current_user():
    """
    Get current authenticated user
    """
    # TODO: Implement JWT validation
    return {
        "id": "1",
        "email": "user@example.com",
        "full_name": "John Doe",
        "role": "student",
    }


@router.post("/logout")
async def logout():
    """
    Logout user
    """
    return {"message": "Logged out successfully"}


@router.post("/refresh-token")
async def refresh_token():
    """
    Refresh access token
    """
    return {
        "access_token": "new_mock_token",
        "token_type": "bearer",
    }
