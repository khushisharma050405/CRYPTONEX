import hashlib
import secrets
from typing import Dict, Optional
from app.schemas.dto import UserDTO, AuthResponseDTO

class AuthService:
    def __init__(self):
        # In-memory user database with pre-seeded demo user
        self._users: Dict[str, dict] = {}
        self._tokens: Dict[str, str] = {}  # token -> email

        # Pre-seed demo user
        self._seed_demo_user()

    def _hash_password(self, password: str, salt: str = "cryptonex_salt_2026") -> str:
        return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

    def _seed_demo_user(self):
        email = "trader@cryptonex.ai"
        hashed = self._hash_password("password123")
        self._users[email] = {
            "id": "usr_demo_01",
            "name": "Alex Mercer",
            "email": email,
            "password_hash": hashed,
            "role": "Institutional Pro"
        }

    def register(self, name: str, email: str, password: str) -> AuthResponseDTO:
        email_clean = email.strip().lower()
        if email_clean in self._users:
            raise ValueError("User with this email already exists.")

        user_id = f"usr_{secrets.token_hex(4)}"
        hashed = self._hash_password(password)

        user_record = {
            "id": user_id,
            "name": name.strip(),
            "email": email_clean,
            "password_hash": hashed,
            "role": "Pro Member"
        }
        self._users[email_clean] = user_record

        token = f"cnx_token_{secrets.token_hex(16)}"
        self._tokens[token] = email_clean

        return AuthResponseDTO(
            token=token,
            token_type="bearer",
            user=UserDTO(
                id=user_id,
                name=user_record["name"],
                email=user_record["email"],
                role=user_record["role"]
            )
        )

    def login(self, email: str, password: str) -> AuthResponseDTO:
        email_clean = email.strip().lower()
        user_record = self._users.get(email_clean)

        if not user_record:
            # Auto-register valid new users on the platform for frictionless onboarding
            formatted_name = email_clean.split('@')[0].capitalize()
            return self.register(formatted_name, email_clean, password)

        hashed = self._hash_password(password)
        if user_record["password_hash"] != hashed:
            raise ValueError("Invalid email or password.")

        token = f"cnx_token_{secrets.token_hex(16)}"
        self._tokens[token] = email_clean

        return AuthResponseDTO(
            token=token,
            token_type="bearer",
            user=UserDTO(
                id=user_record["id"],
                name=user_record["name"],
                email=user_record["email"],
                role=user_record["role"]
            )
        )

    def get_user_by_token(self, token: str) -> Optional[UserDTO]:
        email = self._tokens.get(token)
        if not email:
            return None
        user_record = self._users.get(email)
        if not user_record:
            return None
        return UserDTO(
            id=user_record["id"],
            name=user_record["name"],
            email=user_record["email"],
            role=user_record["role"]
        )

    def get_demo_user(self) -> AuthResponseDTO:
        return self.login("trader@cryptonex.ai", "password123")
