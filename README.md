# TruthStory Android App

진실의 책 컨셉의 메모 앱입니다. 안드로이드 설치형 앱으로 빌드할 수 있도록 Capacitor 설정이 포함되어 있습니다.

## 1) 설치

```bash
npm install
```

## 2) 안드로이드 프로젝트 생성

```bash
npm run android:add
```

## 3) 웹 자산 동기화

```bash
npm run android:sync
```

## 4) Android Studio 열기

```bash
npm run android:open
```

Android Studio에서 `Build > Build Bundle(s) / APK(s) > Build APK(s)`를 선택하면 APK를 생성할 수 있습니다.

## 검증

```bash
npm run check:syntax
npm run check:type
npm test
```