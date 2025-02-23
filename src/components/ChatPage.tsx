import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import Header from './Header';
import Footer from './Footer';

const ChatPage = () => {
  const { language, dir, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div dir={dir} className="flex flex-col h-screen bg-gray-100">
        <div className="flex-1 flex">
          {/* Sidebar (Chat List) */}
          <div className="w-1/4 p-4">
            <Card className="h-full shadow-md">
              <CardHeader className="p-4">
                <h2 className="text-lg font-semibold">{t('chatListTitle')}</h2>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  <li className="p-4 hover:bg-gray-50 cursor-pointer flex items-center gap-4">
                    <div className="relative shrink-0">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className={`absolute bottom-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-3 h-3 bg-blue-500 rounded-full border-2 border-white`}></span>
                    </div>
                    <div>
                      <div className="font-medium">User 1</div>
                      <div className="text-sm text-gray-500">Last message from User 1</div>
                    </div>
                  </li>
                  <li className="p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-4">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                      <div className="font-medium">User 2</div>
                      <div className="text-sm text-gray-500">Last message from User 2</div>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Window */}
          <div className="flex-1 flex flex-col p-4">
            <Card className="h-full shadow-md">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold">User 1</h3>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div>Message from User 1</div>
                <div>Message from You</div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200 flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <Button>Send</Button>
              </div>
            </Card>
          </div>

          {/* Advertisement Box */}
          <div className="w-1/4 p-4">
            <Card className="h-full shadow-md">
              <CardHeader className="p-4">
                <h2 className="text-lg font-semibold">{t('adBoxTitle')}</h2>
              </CardHeader>
              <CardContent className="p-4">
                <h3>Advertisement Title</h3>
                <a href="/advertisement" className="text-blue-500 hover:underline">View Advertisement</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;