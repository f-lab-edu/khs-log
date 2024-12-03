# Supabase 설정 가이드

이 프로젝트는 Supabase를 활용하여 사용자 인증, 데이터베이스 관리, API 호출 등을 구현합니다. 아래 단계를 따라 Supabase를 설정하세요.

### 🚨 참고 사항

- 본 문서에서 소개하는 테이블 생성 가이드는 해당 프로젝트를 실행하기 위한 기본 설정입니다. 프로젝트의 필요에 따라 테이블을 추가하거나 수정할 수 있으며, 이로 인해 발생하는 추가 작업에 대한 지원은 제공되지 않습니다.

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com/) 웹사이트에 접속하여 계정을 생성합니다.
2. 새 프로젝트를 생성하고 데이터베이스를 설정합니다.
3. 프로젝트 대시보드에서 **Settings > API**로 이동하여 `URL`과 `anon` 키를 복사합니다.

## 2. 환경 변수 설정

Supabase에서 제공된 `URL`과 `anon` 키를 프로젝트의 환경 변수로 설정합니다.

1. 프로젝트 루트 디렉토리에 `.env.local` 파일을 생성합니다.
2. 아래 내용을 `.env.local` 파일에 추가합니다:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Supabase Table 생성

Supabase 프로젝트 대시보드에서 Table Editor로 이동하여, 블로그 프로젝트에 필요한 Table을 생성합니다.

### 1. users 테이블

`users` 테이블의 필드와 설정 내용입니다:
| **Name** | **Type** | **Default Value** | **Primary** | **설명** |
|----------------|----------------|-------------------------|-------------|------------------------------------|
| `id` | `uuid` | `gen_random_uuid()` | ✅ | 고유 식별자(UUID). 자동 생성됨. |
| `created_at` | `timestamp` | `now()` | | 레코드 생성 시각. 기본값은 현재 시간. |
| `role` | `text` | `NULL` | | 사용자의 역할. 예: admin, user. |
| `email` | `text` | `NULL` | | 사용자의 이메일 주소. |
| `username` | `text` | `empty string` | | 사용자의 이름 또는 별칭. |

sql을 활용하는 방법도 있습니다.

```
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP DEFAULT now(),
  role TEXT,
  email TEXT,
  username TEXT
);
```

### 2. profile 테이블

`profile` 테이블의 필드와 설정 내용입니다:
| **Name** | **Type** | **Default Value** | **Primary** | **Nullable** | **설명** |
|---------------|------------|-------------------------|-------------|--------------|----------------------------------|
| `id` | `uuid` | `gen_random_uuid()` | ✅ | ❌ | 고유 식별자(UUID). 자동 생성됨. |
| `mainTitle` | `text` | `NULL` | | ❌ | 프로필의 주요 제목. |
| `subTitle` | `text` | `NULL` | | ❌ | 프로필의 부제목. |
| `contents` | `text` | `NULL` | | ❌ | 프로필에 대한 설명. |
| `skills` | `jsonb` | `NULL` | | ✅ | 사용자의 기술 목록(JSON 배열). |
| `tools` | `jsonb` | `NULL` | | ✅ | 사용 도구 목록(JSON 배열). |
| `role` | `text` | `NULL` | | ❌ | 사용자 역할(예: 개발자, 디자이너). |
| `imageUrl` | `text` | `NULL` | | ✅ | 프로필 이미지 URL. |

sql을 활용하는 방법도 있습니다.

```
CREATE TABLE profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mainTitle TEXT NOT NULL,
  subTitle TEXT NOT NULL,
  contents TEXT NOT NULL,
  skills JSONB DEFAULT NULL,
  tools JSONB DEFAULT NULL,
  role TEXT NOT NULL,
  imageUrl TEXT DEFAULT NULL
);
```
