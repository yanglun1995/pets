import { Heart, MessageCircle, Users, Calendar } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: MessageCircle,
      title: '养宠交流',
      description: '分享养宠心得，交流经验，相互学习，一起成长'
    },
    {
      icon: Heart,
      title: '养宠互助',
      description: '互帮互助，温暖社区，解决养宠过程中的各种问题'
    },
    {
      icon: Calendar,
      title: '宠物活动',
      description: '参加精彩的宠物活动，认识更多志同道合的小伙伴'
    }
  ];

  return (
    <div className="min-h-screen bg-warm-50 py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-5xl">🐾</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">关于宠互助</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            一个温暖的宠物爱好者社区，让每一位养宠人都能找到志同道合的朋友
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-16 max-w-3xl mx-auto">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1.2K+</div>
              <div className="text-gray-500">养宠伙伴</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">856</div>
              <div className="text-gray-500">互助成功</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">156</div>
              <div className="text-gray-500">精彩活动</div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">加入我们</h2>
          <p className="text-gray-500 mb-6">
            如果你有任何问题或建议，欢迎随时联系我们，一起让这个社区变得更好
          </p>
          <div className="flex justify-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
