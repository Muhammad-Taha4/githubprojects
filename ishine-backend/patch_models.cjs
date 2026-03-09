const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'app', 'Models');

const productPath = path.join(modelsDir, 'Product.php');
let productContent = fs.readFileSync(productPath, 'utf8');
productContent = productContent.replace('}', `
    protected $guarded = [];
    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
        'is_active' => 'boolean',
        'retail_price' => 'decimal:2',
        'wholesale_price' => 'decimal:2',
    ];
    public function brand() { return $this->belongsTo(Brand::class); }
    public function category() { return $this->belongsTo(Category::class); }
}`);
fs.writeFileSync(productPath, productContent);

const orderPath = path.join(modelsDir, 'Order.php');
let orderContent = fs.readFileSync(orderPath, 'utf8');
orderContent = orderContent.replace('}', `
    protected $guarded = [];
    protected $casts = [
        'shipping_address' => 'array',
        'items' => 'array',
        'total' => 'decimal:2'
    ];
    public function user() { return $this->belongsTo(User::class); }
}`);
fs.writeFileSync(orderPath, orderContent);

const userPath = path.join(modelsDir, 'User.php');
let userContent = fs.readFileSync(userPath, 'utf8');
if (!userContent.includes('orders()')) {
    userContent = userContent.replace('}', `
    public function orders() { return $this->hasMany(Order::class); }
}`);
    fs.writeFileSync(userPath, userContent);
}

const simpleModels = ['Brand.php', 'Category.php', 'Banner.php', 'MenuItem.php', 'SectionContent.php', 'CartItem.php', 'OrderItem.php'];
for (const sm of simpleModels) {
    const sp = path.join(modelsDir, sm);
    if (fs.existsSync(sp)) {
        let sc = fs.readFileSync(sp, 'utf8');
        sc = sc.replace('use HasFactory;', 'use HasFactory;\n    protected $guarded = [];');
        fs.writeFileSync(sp, sc);
    }
}

console.log('Models patched.');
