import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'zh', 'fr', 'es', 'de']; // 可扩展

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 跳过静态文件和 API 路由
  if (
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // 首页 / 直接放行，英文直出
  if (pathname === '/') {
    return NextResponse.next();
  }

  // 检查是否有语言前缀
  const pathnameParts = pathname.split('/');
  const lang = pathnameParts[1];

  if (SUPPORTED_LOCALES.includes(lang)) {
    return NextResponse.next();
  }

  // 其他无前缀页面（如 /about、/games/xxx）可选重定向到默认语言或直接放行
  // 这里选择直接放行，英文直出
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 